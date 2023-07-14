import { rest, RestContext } from "msw";

const COOKIE_VALID_TIME = 2 * 60 * 60 * 1_000; // 2 hours

function makeSessionCookie(
  options: Parameters<RestContext["cookie"]>[2] = {},
): [string, string, Parameters<RestContext["cookie"]>[2]] {
  return [
    "ci_session_mock",
    "123456789",
    {
      domain: "",
      expires: new Date(Date.now() + COOKIE_VALID_TIME),
      sameSite: "lax",
      path: "/",
      ...options,
    },
  ];
}

const user = {
  email: "john@doe.com",
  phone: "0123456789",
  lastname: "Doe",
  firstname: "John",
  id: "1",
};

export const handlers = [
  rest.post(
    "https://www.staging.supervan.fr/proboard/ajax_login",
    async (req, res, ctx) => {
      const { email, mdp } = await req.json<{ email: string; mdp: string }>();

      if (email === "john@doe.com" && mdp === "123456") {
        return res(
          ctx.cookie(...makeSessionCookie()),
          ctx.json({ message: { user } }),
        );
      }

      return res(ctx.status(401));
    },
  ),

  rest.get(
    "https://www.staging.supervan.fr/proboard/ajax_account_info",
    async (req, res, ctx) => {
      const sessionCookie = req.cookies.ci_session_mock;

      if (!sessionCookie) {
        return res(ctx.status(401));
      }

      return res(
        ctx.cookie("ci_session_mock", sessionCookie, {
          domain: "",
          expires: new Date(Date.now() + COOKIE_VALID_TIME),
          sameSite: "lax",
          path: "/",
        }),
        ctx.json({ message: { user } }),
      );
    },
  ),

  rest.post(
    "https://www.staging.supervan.fr/proboard/logout",
    async (req, res, ctx) => {
      delete req.cookies.ci_session_mock;

      return res(
        ctx.cookie(...makeSessionCookie({ expires: new Date() })),
        ctx.xml("<div>"),
      );
    },
  ),

  rest.get("chrome-extension://*", async (req) => {
    return req.passthrough();
  }),
  rest.get("http://localhost:9002/*", async (req) => {
    return req.passthrough();
  }),
];
