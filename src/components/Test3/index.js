import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import debounce from 'lodash.debounce';
import { User, Bill } from './Test3';
import {
  USER_TYPE,
  RETAIL_TYPE,
} from '../../constants/constants';

import "react-datepicker/dist/react-datepicker.css";
import { throwStatement } from '@babel/types';

const QUESTION_3_TITLE = "Question 3"; 

const DEBOUNCE_DELAY_TIMING = 100;
const DEBOUNCE_OPTIONS = {
  'leading': true,
  'trailing': true
}

const FORM_USER_NAME = {
  ID: "userName",
  TITLE: "User Name",
  PLACEHOLDER: "Please input the user's name here"
};

const FORM_USER_TYPE = {
  ID: "userType",
  TITLE: "User Type",
};

const FORM_USER_CREATED_DATE = {
  ID: "userCreatedDate",
  TITLE: "User's Created Date:",
  PLACEHOLDER: "dd/MM/yyyy"
};

const FORM_RETAIL_TYPE = {
  ID: "retailType",
  TITLE: "Retail Type",
};

const FORM_USER_PAYMENT_AMOUNT = {
  ID: "userPaymentAmount",
  TITLE: "Amount",
  PLACEHOLDER: "Please input the user's amount here"
};

const FORM_USER_PAYMENT_AMOUNT_AFTER_DISCOUNTED = {
  TITLE: "Discounted amount",
}

const FORM_SUBMIT = {
  TEXT: "Submit"
}

export default class Test3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userType: USER_TYPE.CUSTOMER,
      userCreatedDate: Date.now(),
      userPaymentAmount: 0,
      retailType: RETAIL_TYPE.MALL,
      paymentHistory: []
    };
  }

  onChange = key => event => {
    this.setState({
      [key]: event.target.value
    });
  }

  handleDateChange = date => {
    const userCreatedDate = new Date(date);
    this.setState({
      userCreatedDate
    });
  }

  handlePaymentBillable = () => {
    const { userName, userType, userCreatedDate, userPaymentAmount, retailType } = this.state;

    const user = new User(userName, userType, userCreatedDate);
    const bill = new Bill(user, retailType, userPaymentAmount);
    const amountAfterDiscounted = bill.handleDiscount();

    this.setState({
      paymentHistory: [
        ...this.state.paymentHistory,
        {
          ...bill,
          amount: userPaymentAmount,
          amountAfterDiscounted
        }
      ]
    }, () => console.log('this.state.paymentHistory', this.state.paymentHistory));
  }

  handleSubmit = event => {
    event.preventDefault();
    this.handlePaymentBillable();
  }
  
  render() {
    const { paymentHistory, userCreatedDate } = this.state;
    return (
      <section>
        <h2>{QUESTION_3_TITLE}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor={FORM_USER_NAME.ID} className="col-sm-2 col-form-label" required>{FORM_USER_NAME.TITLE}</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id={FORM_USER_NAME.ID} placeholder={FORM_USER_NAME.PLACEHOLDER} onChange={debounce(this.onChange(FORM_USER_NAME.ID), DEBOUNCE_DELAY_TIMING, DEBOUNCE_OPTIONS)} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor={FORM_USER_TYPE.ID} className="col-sm-2 col-form-label">{FORM_USER_TYPE.TITLE}</label>
            <div className="col-sm-10">
              <select className="form-control" id={FORM_USER_TYPE.ID} onChange={this.onChange(FORM_USER_TYPE.ID)} defaultValue={USER_TYPE.CUSTOMER}>
                {Object.keys(USER_TYPE).map((item, index) => <option key={`user-type-${index}`} value={USER_TYPE[item]}>{USER_TYPE[item]}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor={FORM_USER_CREATED_DATE.ID} className="col-sm-2 col-form-label">{FORM_USER_CREATED_DATE.TITLE}</label>
            <div className="col-sm-10">
              <DatePicker
                selected={userCreatedDate}
                onChange={this.handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                id={FORM_USER_CREATED_DATE.ID}
                placeholderText={FORM_USER_CREATED_DATE.PLACEHOLDER}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor={FORM_RETAIL_TYPE.ID} className="col-sm-2 col-form-label">{FORM_RETAIL_TYPE.TITLE}</label>
            <div className="col-sm-10">
              <select className="form-control" id={FORM_RETAIL_TYPE.ID} onChange={this.onChange(FORM_RETAIL_TYPE.ID)} defaultValue={RETAIL_TYPE.MALL}>
                {Object.keys(RETAIL_TYPE).map((item, index) => <option key={`retail-type-${index}`} value={RETAIL_TYPE[item]}>{RETAIL_TYPE[item]}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor={FORM_USER_PAYMENT_AMOUNT.ID} className="col-sm-2 col-form-label">{FORM_USER_PAYMENT_AMOUNT.TITLE}</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" pattern="[0-9]*" required id={FORM_USER_PAYMENT_AMOUNT.ID} placeholder={FORM_USER_PAYMENT_AMOUNT.PLACEHOLDER} onChange={debounce(this.onChange(FORM_USER_PAYMENT_AMOUNT.ID), DEBOUNCE_DELAY_TIMING, DEBOUNCE_OPTIONS)} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">{FORM_SUBMIT.TEXT}</button>
        </form>
        <hr className="mt-5"/>
        {paymentHistory ? (<table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">{FORM_USER_NAME.TITLE}</th>
              <th scope="col">{FORM_USER_TYPE.TITLE}</th>
              <th scope="col">{FORM_RETAIL_TYPE.TITLE}</th>
              <th scope="col">{FORM_USER_PAYMENT_AMOUNT.TITLE}</th>
              <th scope="col">{FORM_USER_PAYMENT_AMOUNT_AFTER_DISCOUNTED.TITLE}</th>
            </tr>
          </thead>
          {paymentHistory.map((item, index) => (
            <tbody>
              <tr>
                <th scope="row">{item.user.fullname}</th>
                <td>{item.user.type}</td>
                <td>{item.retailType}</td>
                <td>{item.amount}</td>
                <td>{item.amountAfterDiscounted}</td>
              </tr>
            </tbody>
          ))}
        </table>) : null}
      </section>
    )
  }
}