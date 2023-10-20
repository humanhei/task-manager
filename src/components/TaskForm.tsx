import { Formik, FormikErrors } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import categories from '../categories';

interface formValue {
  title: string,
  date: string,
  cat: string,
}

interface taskFormProps {
  onAddItem: (title: string, date: string, cat: string) => void;
}

function TaskForm({ onAddItem }: taskFormProps) {

  return (
    <>
      <div>
        <Formik
          initialValues={{ title: '', date: '', cat: '' }}
          validate={values => {
            const errors: FormikErrors<formValue> = {};
            if (!values.title || values.title.length < 3) {
              errors.title = 'Title should be at least 3 characters.';
            }
            if (!values.date ) {
              errors.date = 'Please select a date';
            }
            if (!values.cat ) {
              errors.cat = 'Please select a category';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            onAddItem(values.title, values.date, values.cat);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" placeholder="Please enter task title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                <Form.Text className="text-danger">
                  {errors.title && touched.title}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" placeholder="Please enter task title" onChange={handleChange} onBlur={handleBlur} value={values.date} />
                <Form.Text className="text-danger">
                  {errors.date && touched.date}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCat">
                <Form.Label>Category</Form.Label>
                <Form.Select id="cat" name="cat" onChange={handleChange} onBlur={handleBlur} value={values.cat}>
                  <option value=''></option>
                  {categories.map((category, id) => <option key={id} value={category}>{category}</option>)}
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.cat && touched.cat}
                </Form.Text>
              </Form.Group>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default TaskForm;