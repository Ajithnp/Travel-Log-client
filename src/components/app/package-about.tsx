import {StarIcon, Info } from "lucide-react";
import { Card } from "../ui/card";


interface PackageAboutSectionProps {
    usp: string;
    description: string;
}
export function PackageAboutSection({ usp, description }: PackageAboutSectionProps) {

    return (
        <>
            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">

                {/* <div className="h-1 w-full bg-amber-400" /> */}

                <div className="px-5 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-violet-50 border border-violet-200">
                        <Info className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                            Overview
                        </p>
                        <h2 className="text-sm font-bold text-gray-800 leading-tight">
                            About This Package
                        </h2>
                    </div>
                </div>

                <div className="border-t border-gray-100 mx-5" />
                <div className="px-5 py-5 space-y-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>
            </Card>

            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">

                <div className="px-5 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 border border-amber-200">
                        <StarIcon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                            Highlights
                        </p>
                        <h2 className="text-sm font-bold text-gray-800 leading-tight">
                            What Makes This Trip Special
                        </h2>
                    </div>
                </div>

                <div className="border-t border-gray-100 mx-5" />
                <div className="px-5 pb-2">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {usp}
                    </p>
                </div>
            </Card>
        </>
    )
}

