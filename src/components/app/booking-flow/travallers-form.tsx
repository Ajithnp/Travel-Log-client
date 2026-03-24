import { Input } from "@/components/ui/input";
import { ID_TYPES, RELATIONS } from "@/types/booking.types";
import type { FormValues } from "@/validations/travllers-form.schema";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";


interface TravellerFormProps {
    index: number;
    isLead: boolean;
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    setValue: UseFormSetValue<FormValues>;
    watch: UseFormWatch<FormValues>;
}

export function TravellerForm({
    index,
    isLead,
    register,
    errors,
    setValue,
    watch,
}: TravellerFormProps) {
    const fieldErrors = errors?.travellers?.[index];
    const currentIdType = watch(`travellers.${index}.idType`);
    const currentRelation = watch(`travellers.${index}.relation`);

    return (
        <div className="rounded-xl border border-gray-300 bg-gray-50/50 p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                </div>
                <div>
                    <p className="font-semibold text-gray-900 text-sm">
                        {isLead ? "Lead Traveller" : `Traveller ${index + 1}`}
                    </p>
                    {isLead && <p className="text-xs text-gray-400">Primary contact person</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {/* Full Name */}
                <div className="col-span-2 sm:col-span-1">
                    <Label className="text-xs text-gray-500 uppercase mb-1.5 block">
                        Full Name (as on ID)
                    </Label>
                    <Input
                        {...register(`travellers.${index}.fullName`)}
                        placeholder="E.g. Arjun Kumar"
                        className="rounded-lg border-gray-200"
                    />
                    {fieldErrors?.fullName && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <Label className="text-xs text-gray-500 uppercase mb-1.5 block">Phone Number</Label>
                    <Input
                        {...register(`travellers.${index}.phoneNumber`)}
                        placeholder="+91 98765 43210"
                        className="rounded-lg border-gray-200"
                    />
                    {fieldErrors?.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.phoneNumber.message}</p>
                    )}
                </div>

                {/* ID Type */}
                <div>
                    <Label className="text-xs text-gray-500 uppercase mb-1.5 block">ID Type</Label>
                    <Select
                        value={currentIdType}
                        onValueChange={(v) => setValue(`travellers.${index}.idType`, v)}
                    >
                        <SelectTrigger className="rounded-lg border-gray-200">
                            <SelectValue placeholder="Select ID" />
                        </SelectTrigger>
                        <SelectContent>
                            {ID_TYPES.map((idType) => (
                                <SelectItem key={idType} value={idType}>
                                    {idType}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* ID Number */}
                <div>
                    <Label className="text-xs text-gray-500 uppercase mb-1.5 block">ID Number</Label>
                    <Input
                        {...register(`travellers.${index}.idNumber`)}
                        placeholder="XXXX XXXX XXXX"
                        className="rounded-lg border-gray-200"
                    />
                    {fieldErrors?.idNumber && (
                        <p className="text-red-500 text-xs mt-1">{fieldErrors.idNumber.message}</p>
                    )}
                </div>

                {/* Email — lead traveller only */}
                {isLead && (
                    <div>
                        <Label className="text-xs text-gray-500 uppercase mb-1.5 block">
                            Email Address
                        </Label>
                        <Input
                            {...register(`travellers.${index}.emailAddress`)}
                            type="email"
                            placeholder="you@email.com"
                            className="rounded-lg border-gray-200"
                        />
                        {fieldErrors?.emailAddress && (
                            <p className="text-red-500 text-xs mt-1">{fieldErrors.emailAddress.message}</p>
                        )}
                    </div>
                )}

                {/* Emergency contact — non-lead travellers only */}
                {!isLead && (
                    <>
                        <div>
                            <Label className="text-xs text-gray-500 uppercase mb-1.5 block">
                                Emergency Contact (Phone)
                            </Label>
                            <Input
                                {...register(`travellers.${index}.emergencyContact`)}
                                placeholder="+91 98765 43210"
                                className="rounded-lg border-gray-200"
                            />
                            {fieldErrors?.emergencyContact && (
                                <p className="text-red-500 text-xs mt-1">
                                    {fieldErrors.emergencyContact.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="text-xs text-gray-500 uppercase mb-1.5 block">Relation</Label>
                            <Select
                                value={currentRelation}
                                onValueChange={(v) => setValue(`travellers.${index}.relation`, v)}
                            >
                                <SelectTrigger className="rounded-lg border-gray-200">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {RELATIONS.map((rel) => (
                                        <SelectItem key={rel} value={rel}>
                                            {rel}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}