import React from 'react';
import {Spin,Alert} from 'antd';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <Spin tip = "Loading...">

        </Spin>;
    }
    else if (error) {
        console.log(error);
        return <Alert message = "Sorry,This Page has missed"
                      type = "Error"
               />;
    }
    else {
        return null;
    }
};
export default function asyncLoad(func){
    return Loadable({
        loader : func,
        loading : MyLoadingComponent
    })
}