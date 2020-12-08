import { connect } from 'react-redux';
import React, { useState } from 'react';
import { getRatedByCurrency, getOneItem } from '../redux/actions/demoAction';

const Demo = ({getOneItem, demo}: any) => {
    return (
        <div>
            <button onClick={() => getOneItem()}>Click me</button>
            {demo != null && demo? console.log(demo) : console.log("Demo is null")}
        </div>
    )
}
const mapStateToProps = (state: any) => {
    return {
        demo: state.demo.data
    }
}
const mapDispatchToProps =(dispatch: any) => {
    return {
        getOneItem: (
            currency: string
        ) => {
            dispatch(
                getOneItem()
            )
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo)
