import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export default () => {

    const [dates, setDates] = useState(new Set());
    const [calMode, setCalMode] = useState("single");

    const addDate = (date) =>
        setDates(prevDates => new Set(prevDates).add(date?.toDateString()));
    return (
        <div className="page">
            <section className="page-actions">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="btn-primary" onClick={() => setCalMode('single')}>
                            New Date
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            initialFocus
                            mode={calMode}
                            // defaultMonth={date?.from}
                            // selected={date}
                            onSelect={addDate}
                        // numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="btn-primary" onClick={() => setCalMode('range')}>
                            New Date Range
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            initialFocus
                            mode={calMode}
                            // defaultMonth={date?.from}
                            // selected={date}
                            // onSelect={addDate}
                        // numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>                

            </section>

            <section className="mx-auto max-w-xs flex flex-col auto-rows-min p-5">
                <ul>
                    {Array.from(dates)
                        .sort((a, b) => new Date(a) - new Date(b))
                        .map((date, i) => (
                            <li key={i} className="flex justify-between">
                                {new Date(date).toLocaleDateString()}
                                <span className="flex items-center space-x-2">
                                    <Switch />
                                </span>
                            </li>
                        ))}
                </ul>
            </section>
        </div>
    )
}