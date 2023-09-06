import ReactQuill from 'react-quill';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn-components/ui/form";
import { IconTooltip } from "@/shared/components/IconTooltip";
import { UseFormReturn } from 'react-hook-form';

interface RichTextProps {
    control: UseFormReturn<any>['control'];
    fieldLabel?: string;
    fieldName: string;
    disabled?: boolean;
}

const RichTextInput = ({ fieldLabel, fieldName, control, disabled = false }: RichTextProps) => (
    <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    <IconTooltip icon="info" label={fieldLabel || fieldName} title="Bon à savoir!" message="Ce texte sera inclus dans le courriel envoyé aux destinataires de ce formulaire." />
                </FormLabel>
                <FormControl>
                    <ReactQuill {...field} readOnly={disabled} ></ReactQuill>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
);

export { RichTextInput };