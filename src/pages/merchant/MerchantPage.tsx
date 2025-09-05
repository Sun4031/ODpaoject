
import { Button } from "antd";
const MerchantPage = () => {
    const navigate = () => {
         window.location.href = '/order';
    }
    return(
        <>
            <Button onClick={navigate}>merchant</Button>
        </>
    )
}
export default MerchantPage;