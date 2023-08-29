import { useNavigate } from "react-router";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";

import { ProfileForm } from "@/shared/components/Form/ProfileForm"
import { Button } from "@/components/ui/button";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="page-actions">
        <Button variant="primary" onClick={() => navigate("/workspace")}>
          Workspace
        </Button>
      </section>

      <section className="relative isolate overflow-hidden bg-invitely py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Bienvenue</h2>
              <p className="mt-4 text-lg leading-8 text-invitely-light">Invitely vous permet d'inviter vos bénévoles et, toute personne impliquée dans l'activité de votre asso, à vos évènements. Simple et efficace pour un gain de temps et une réduction de stress sans pareil.</p>
              <br />
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Rejoignez-nous gratuitement</h2>
              <p className="mt-4 text-lg leading-8 text-invitely-light">Sans publicité ni marchandisation de vos données, cet outil est réalisé par des bénévoles et mis à disponition des associations françaises uniquement.</p>

              <ProfileForm username="nickname" email="a@b.c" />
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                  </svg>
                </div>
                <dt className="mt-4 font-semibold text-lg text-white">Mobilisez vos bénévoles</dt>
                <dd className="mt-2 leading-7 text-invitely-light">Vous avez besoin de renforts pour organiser un ou plusieurs évènements ? <p>En quelques clics un email leur sera envoyé contenant la liste des dates, il répondront par oui ou non à chaque date et vos planning seront automatiquement à jour.</p></dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <DocumentCheckIcon className="h-6 w-6 text-white" />
                </div>
                <dt className="mt-4 font-semibold text-lg text-white">Envoyez des questionnaires</dt>
                <dd className="mt-2 leading-7 text-invitely-light">Demandez les disponibilités de chacun afin de plannifier la répartition des resources à chaque évenement nécessitant des renforts, vous pouvez choisir de les relancer 1 ou 2 fois automatiquement.</dd>
              </div>
            </dl>
          </div>
        </div>

      </section>
    </>
  )
}