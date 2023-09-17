import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Row} from 'react-bootstrap';
import {Form, FloatingLabel, InputGroup} from 'react-bootstrap'
import {GoogleSignIn} from './GoogleSignIn'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Session } from '../App';
import {storage} from '../firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

// export bình thường, export bình thường là đang export cái hàm Example
export function CreatePlantModal() {

  const session = useContext(Session)

  const formik = useFormik({
  // giá trị khởi điểm của cái form
    initialValues : {
      fruitId: 'BAN',
      name: 'Banana',
      file: null,
      image: "",
      description: "It's yellow",
      price: 1000,
      quantity: 10
    },
  // xác định các phần validation
    validationSchema : Yup.object({
      fruitId: Yup.string()
      .min(3, 'Id length cannot less then 3')
      .max(5, "id cannot longer than 5")
      .required('Email is required'),
      name: Yup.string()
      .min(6, 'Name must be at least 6 characters')
      .max(20, 'Name must be more than 6 characters')
      .required('Name is required'),
      description:  Yup.string()
      .min(100, 'Description must be at least 100 characters')
      .max(1000, 'Description must be more than 1000 characters')
      .required('Description is required'),
      price: Yup.number()
      .min(1, "Tối thiểu là 1")
      .max(10000000, "Tối đa là như này")
      .required("Yêu cầu phải điền price"),
      quantity: Yup.number()
      .min(1, "Tối thiểu là 1")
      .max(10, "Tối đa là như này")
      .required("Yêu cầu phải điền quantity"),

  }),
  // cái hàm sẽ xử khi các em nhấn submit
  onSubmit : values => {

    const handleUploadFirebase = async () => {
      // dòng này chính là ta lấy dữ liệu từ cái file
      const data = await values.file.arrayBuffer()
      // cho phép firebase lưu hình dưới dạng hiển thị thay vì download url, thử xóa metadata đi để thấy sự khác khác
      const metadata = {
        contentType: 'image/png',
      }
      // lấy pointer của firebase storage, và lưu nó vào bên trong /cuong/ tên file
      const storageRef = ref(storage, `/cuong/${values.file.name}`)
      
      // upload lên bộ nhớ firebase
      await uploadBytes(storageRef, data, metadata)
    
      // lấy ra đường dẫn firebase trả về
      values.image = await getDownloadURL(storageRef)

      console.log(values.image)
    }
    
    handleUploadFirebase()
    
    console.log(values);

    axios.post("https://localhost:7036/api/Plants"
    ,{
      plantId: values.fruitId,
      name: values.name,
      image: values.image,
      description: values.description,
      price: values.price,
      quantity: values.quantity
    }
    ).then(response => console.log(response.data))
    .catch(errors => console.log(errors))
    
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
        Create Plant
      </Button>

    {/* đoạn code này chính là đoạn hiển thị ra cái modal */}

      <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>


       <Row> 

          <Col> 
        <FloatingLabel
        label="Fruit ID"
      >
        <Form.Control 
        id="fruitId"
        type="text" 
        placeholder="name@example.com" 
        
        defaultValue={formik.values.fruitId}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} />
  
      </FloatingLabel>
      
      {formik.touched.fruitId && formik.errors.fruitId ? (
        <div style={{color:'red'}}>{formik.errors.fruitId}</div>
                                    ) : null}

</Col>
<Col>
      <FloatingLabel label="Name">
        <Form.Control 
        id="name"
        type="text" 
        placeholder="Password" 
        defaultValue={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         />
      </FloatingLabel>
   
      {formik.touched.name && formik.errors.name ? (
        <div style={{color:'red'}}>{formik.errors.name}</div>
                                    ) : null}
 </Col>
</Row>



<Row> 

<Col> 
<FloatingLabel
label="Price"
>
<Form.Control 
id="price"
type="number" 
placeholder="name@example.com" 

defaultValue={formik.values.price}
onChange={formik.handleChange}
onBlur={formik.handleBlur} />

</FloatingLabel>

{formik.touched.price && formik.errors.price ? (
<div style={{color:'red'}}>{formik.errors.price}</div>
                          ) : null}

</Col>
<Col>
<FloatingLabel label="Quantity">
<Form.Control 
id="quantity"
type="number" 
placeholder="Password" 
defaultValue={formik.values.quantity}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
/>
</FloatingLabel>

{formik.touched.quantity && formik.errors.quantity ? (
<div style={{color:'red'}}>{formik.errors.quantity}</div>
                          ) : null}
</Col>
</Row>

<FloatingLabel label="Description" className='mb-3'>
        <Form.Control
         id="description"
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          defaultValue={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </FloatingLabel>

      {formik.touched.description && formik.errors.description ? (
<div style={{color:'red'}}>{formik.errors.description}</div>
                          ) : null}

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Image
        </InputGroup.Text>
        
        <Form.Control
          id = "file"
          type = "file"
          onBlur={formik.handleBlur}
          onChange={event => {
             
             formik.values.file = event.target.files[0]
               }}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          accept="image/*"
        />
      </InputGroup>
      {formik.touched.file && formik.errors.file ? (
<div style={{color:'red'}}>{formik.errors.file}</div>
                          ) : null}

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
