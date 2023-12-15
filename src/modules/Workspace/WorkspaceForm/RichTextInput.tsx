import { UseFormReturn } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn-components/ui/form";
import { IconTooltip } from "@/shared/components/IconTooltip";
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

// 
/**
 * Currently, react-quill is included in the RichTextInput component.
 * The `message` form value gets its value from react-quill.
 * While the react-quill text box appears empty from a UI/User perspective, 
 * it actually is equal to "<p><br></p>"
 * So, this is a custom validator function to check if it is `empty` 
 * that way.
 */
export const notEqualToPBrP = value => value !== "<p><br></p>"

export { RichTextInput };