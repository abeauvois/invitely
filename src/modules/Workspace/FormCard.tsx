export default ({form}) => (
    <li>
        <a href="/#" className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-slate-300 text-sm leading-6 text-slate-900 font-medium
         py-3">
            <dl className="">
                <div>
                    <dt className="sr-only">Title</dt>
                    <dd>
                        {form.title}
                        <p>&nbsp;</p>
                    </dd>
                </div>
            </dl>
        </a>
    </li>
);