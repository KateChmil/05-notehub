import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NoteTag } from "../../types/note";
import * as Yup from "yup";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Name is required"),
   content: Yup.string()
        .max(500, "Content is too long"),
   tag: Yup.mixed().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required("Tag is required"),
    
});


interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};


interface NoteFormProps{
        onClose: () => void;
}


export default function NoteForm({onClose}: NoteFormProps) {
  const queryClient = useQueryClient();


const mutation = useMutation({
        mutationFn: createNote, 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onClose();
    }
  });

  return (
      <Formik initialValues={initialValues} onSubmit={(values: NoteFormValues) => mutation.mutate(values)}   validationSchema={NoteFormSchema}>
          
          <Form className={css.form}>
            
        <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="span" className={css.error} />
        </div>
        
        <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as="textarea" name="content" id="content" rows={6} />
    <ErrorMessage name="content" component="span" className={css.error} />
         </div>
              

<div className={css.formGroup}>
                  <label htmlFor="tag">Tag</label>
                  <Field as="select" name="tag" id="tag" className={css.select}>
    
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <ErrorMessage name="content" component="span" className={css.error} />
  </div>

        <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick = {onClose}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
    >
      Create note
    </button>
  </div>

      </Form>
    </Formik>
  );
}