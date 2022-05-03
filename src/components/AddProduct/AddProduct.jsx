import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

import { selectOptions } from "./options";

import { inputs, array } from "./input";
import FormInputs from './FormInputs';
import axios from 'axios';

const URL = "https://mary-product-app.herokuapp.com/"

const AddProduct = () => {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState(0);
  const [optionValue, setOptionValue] = useState([]);
  const [values, setValues] = useState([]);
  const [err, setErr] = useState("");
  const [allValues, setAllValues] = useState([]);
  const [category, setCategory] = useState('');
  const labelType = [" please choose a type",
    "Please, provide dimensions",
    "Please, provide size",
    "Please, provide weight"

  ]
  const categories = ['sw', 'furniture', 'dvd', 'book'];


  const handleInputChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));



  }
  useEffect(() => {

    setCategory(categories[selectValue])
    setAllValues({ ...values, ...optionValue, category })

  }, [values, optionValue, category])


  const handleOptionChange = (event) => {
    setOptionValue({ ...optionValue, [event.target.name]: event.target.value });


  };
  const onChangeOption = (e) => {

    setSelectValue(e.target.value);

    setOptionValue([]);

  };

  const handleCancel = () => {
    navigate("/")
  }

  const handleSave = async () => {


    if ((Object.keys(allValues).length >= 5 && selectValue !== 1) || (Object.keys(allValues).length === 7)) {

      const exist = Object.values(allValues).includes("");
      if (!exist) {
        await axios.post(URL, JSON.stringify(allValues)).then(function (response) {
          navigate("/")
        })
      } else {
        setErr("Please, submit required data")

      }
    }
    else {
      setErr("Please, submit required data")

    }


  }
  console.log(selectValue)
  return (
    <>
      <header className="header">
        <h1> Add Product</h1>
        <div className="buttons">
          <button onClick={() => handleSave()} className="green">Save </button>
          <button onClick={() => handleCancel()} className="red"> Cancel</button>
        </div>
      </header>
      <main className="component">

        <form id=" #product_form" >
          <p className="redText">{err}</p>
          <table cellSpacing="15">
            <tbody>
              <tr>
                <th align="left">
                  <label>Sku</label>
                </th>
                <td className="col" >
                  <input
                    id="#sku"
                    name="sku"
                    type="text"
                    placeholder="#Sku"
                    label="Sku"
                    value={values["sku"] = Date.now()}
                    readOnly

                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label>Name</label>
                </th>
                <td className="col" >
                  <input
                    id="#name"
                    name="name"
                    type="text"
                    placeholder="#Name"
                    label="Name"
                    errormessage="name should be at least 1 alphanumeric"
                    required
                    value={values["name"]}
                    onChange={handleInputChange}

                  />
                </td>
              </tr>
              <tr>
                <th align="left">
                  <label>Price</label>
                </th>
                <td className="col" >
                  <input
                    id="#price"
                    name="price"
                    type="number"
                    placeholder="#Price"
                    label="Price ($)"
                    errormessage="price should be a number "
                    pattern="^([1-9][0-9]{02}|1000)$"
                    required
                    value={values["price"]}
                    onChange={handleInputChange}

                  />
                </td>
              </tr>

              <tr>
                <th ></th>
                <td>
                  <label> {labelType[selectValue]}</label>

                </td>
              </tr>


              <tr>
                <th >
                  <label> Type Switcher</label>
                </th>
                <td>
                  <select
                    id="#productType"

                    value={selectValue}
                    onChange={onChangeOption}
                  >

                    {selectOptions.map((option, index) => (

                      <option key={index} value={option.value}>
                        {option.label}

                      </option>


                    ))}
                  </select>

                </td>
              </tr>


              {array[selectValue].map((input, index) => (
                <FormInputs
                  key={index}
                  {...input}
                  value={optionValue[input.name] ?? ""}
                  onChange={handleOptionChange}
                  errorMessage={input.errormessage}

                />
              ))}




            </tbody>
          </table>
        </form>
      </main>
      <Footer />

    </>
  )
}

export default AddProduct