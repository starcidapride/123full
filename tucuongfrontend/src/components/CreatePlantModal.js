import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form, FloatingLabel} from 'react-bootstrap'
import {GoogleSignIn} from './GoogleSignIn'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Session } from '../App';


// export bình thường, export bình thường là đang export cái hàm Example
export function CreatePlantModal() {

  const session = useContext(Session)

  const formik = useFormik({
  // giá trị khởi điểm của cái form
    initialValues : {
      email: 'cuong@gmail.com',
      password: '123456',
    },
  // xác định các phần validation
    validationSchema : Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
  // cái hàm sẽ xử khi các em nhấn submit
  onSubmit : values => {
    console.log(values);

    axios.post('https://localhost:7036/api/Accounts/SignIn', {
      email: values.email,
      password: values.password
    })
    .then(response => {
      session.setUser(response.data)
    })
    .catch(error => console.log(error))

    handleClose()
  }
  })



  // thứ nhất là phải lưu các giá trị đã nhập trong form
  // dùng axios để call về API https://localhost:7036/api/Accounts/SignIn



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    {/* đoạn code dưới chính là nút bấm hiển thị ra modal */}
      <Button variant="primary" onClick={handleShow}>
        Sign In
      </Button>

    {/* đoạn code này chính là đoạn hiển thị ra cái modal */}

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel
        label="Email address"
      >
        <Form.Control 
        id="email"
        type="email" 
        placeholder="name@example.com" 
        
        defaultValue={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} />
  
      </FloatingLabel>
      
      {formik.touched.email && formik.errors.email ? (
        <div style={{color:'red'}}>{formik.errors.email}</div>
                                    ) : null}

      <FloatingLabel label="Password">
        <Form.Control 
        id="password"
        type="password" 
        placeholder="Password" 
        defaultValue={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         />
      </FloatingLabel>
   
      {formik.touched.password && formik.errors.password ? (
        <div style={{color:'red'}}>{formik.errors.password}</div>
                                    ) : null}

      <div className='mb  -3'/>
      <GoogleSignIn />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
