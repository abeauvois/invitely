import ReactQuill from 'react-quill';
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { IconTooltip } from "@/shared/components/IconTooltip";

const RichTextInput = ({ fieldName, control }) => (
    <FormField
        control={control}
        name={fieldName}
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    <IconTooltip icon="info" label={fieldName} title="Bon à savoir!" message="Ce texte sera inclus dans le courriel envoyé aux destinataires de ce formulaire." />
                </FormLabel>
                <FormControl>
                    <ReactQuill {...field}></ReactQuill>
                </FormControl>
            </FormItem>
        )} />
);

export { RichTextInput };