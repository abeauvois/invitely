import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default ({onSelectDate}) => (
    <>
        <h2 className="font-semibold text-slate-900">
            <Link to={"/workspace"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg></Link>
        </h2>
        <section className="page-actions mt-0">

            <Popover>
                <PopoverTrigger asChild>
                    <Button className="btn-primary">
                        + Date
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="top-4">
                    <Calendar
                        initialFocus
                        mode="single"
                        // defaultMonth={date?.from}
                        // selected={date}
                        onSelect={onSelectDate}
                    // numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button className="btn-primary">
                        + Plage de dates
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        initialFocus
                        mode="range"
                    // defaultMonth={date?.from}
                    // selected={date}
                    // onSelect={addDate}
                    // numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
            <Button className="btn-primary">
                Envoyer
            </Button>
        </section>
    </>
)