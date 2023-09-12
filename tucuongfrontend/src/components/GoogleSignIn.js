
import React, {useContext} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Session } from '../App';

export function GoogleSignIn() {

    const session = useContext(Session)


    // hàm này là hàm 1, response chính là phản hồi
    const responseMessage = (response) => {
       console.log(response)
       
    };

    // hàm này là hàm 2, đều là hàng copy hết
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        // onSuccess thì gọi ra hàm 1, thất bại thì gọi ra hàm 2
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    )
}