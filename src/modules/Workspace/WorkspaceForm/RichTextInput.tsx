import ReactQuill from 'react-quill';
import { FormControl, FormField, FormItem, FormLabel } from "@/shadcn-components/ui/form";
import { IconTooltip } from "@/shared/components/IconTooltip";
import { UseFormReturn } from 'react-hook-form';

interface RichTextProps {
    control: UseFormReturn<any>['control'];
    fieldLabel?: string;
    fieldName: string;
}

const RichTextInput = ({ fieldLabel, fieldName, control }: RichTextProps) => (
    <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    <IconTooltip icon="info" label={fieldLabel || fieldName} title="Bon à savoir!" message="Ce texte sera inclus dans le courriel envoyé aux destinataires de ce formulaire." />
                </FormLabel>
                <FormControl>
                    <ReactQuill {...field}></ReactQuill>
                </FormControl>
            </FormItem>
        )} />
);

export { RichTextInput };