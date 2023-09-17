import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Col, Row, Button } from "react-bootstrap"
import PlantCard from "../components/PlantCard"
import { CreatePlantModal } from "../components/CreatePlantModal"

export const Storage = () => {

    //useEffect là nó sẽ định nghĩa cái hàm sẽ gọi ra khi mà Component/ function html render
    // useEffect có nhiều loại, nhưng mà thông dụng nhất là loại mà có [] ở cuối => loại này là cái loiaj
    // sẽ được gọi khi mà component render

    const [plants, setPlants] = useState([])

    // khi hàm Stogare được gọi ở đâu đó để render, thì câu lệnh trong useEffect sẽ được thực thi trước,
    // và component sẽ render
    useEffect(() => {
        axios.get("https://localhost:7036/api/Plants")
            .then(response => setPlants(response.data))
            .catch(error => console.log(error))
    }
        , [])

    const renderPlants = () => {
        const renderedPlants = []

        // forEach tức là nó sẽ tìm mỗi cái phần tử trong plants, với mỗi cái
        // plant thì ta sẽ thực thi hàm nào
        //plants là 1 cái mảng
        plants.forEach(plant => {
            //push tức là thêm vào mảng
            renderedPlants.push(
                // màn hình xl, md chiếm 3 phần/12 phần, những màn còn lại thì chiếm full
                <Col xl = {3} md = {3} > 
                    <PlantCard data = {plant}/>
                </Col>
            )
        })

        return renderedPlants
    }

    return <div>
       <Container>
        <CreatePlantModal />
        <Row>
             {renderPlants()}
        </Row>
       </Container>

    </div>
}