import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const Home = () => {
  const [productdata, setProductdata] = useState([]);
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [company, setCompany] = useState('');
  const [editproduct, setEditproduct] = useState([]);
  const [editid, seteditId] = useState('')
  const [editcategory, seteditCategory] = useState('');
  const [editmodel, seteditModel] = useState('');
  const [editprice, seteditPrice] = useState('');
  const [editcompany, seteditCompany] = useState('');
  const [modelclose, setmodelClose] = useState(false)
  useEffect(() => {
    showproduct();
  }, [])

  const showproduct = async () => {
    var productdata = await axios.get('http://localhost:3000/getproduct')
    setProductdata(productdata.data.getproduct)
  }

  const productSubmit = async (e) => {
    e.preventDefault()
    const data = { category, model, price, company }
    await axios.post('http://localhost:3000/createproduct', data)
      .then((res) => {
        if (res.status === 201) {
          setCategory('');
          setModel('');
          setPrice('');
          setCompany('');
        }
      })
    showproduct();
  }

  const editproductdata = async (id) => {
    var showeditProduct = await axios.get(`http://localhost:3000/getproduct/${id}`)
    console.log(showeditProduct)
    setEditproduct(showeditProduct.data.getproduct)
    const article = showeditProduct.data.getproduct;
    seteditCategory(article.category);
    seteditModel(article.model);
    seteditPrice(article.price);
    seteditCompany(article.company);
    seteditId(article.id);
  }

  const editproductSubmit = async (e) => {
    e.preventDefault();
    const editvalue = {
      category: editcategory,
      model: editmodel,
      price: editprice,
      company: editcompany
    }
    var editdata = await axios.put(`http://localhost:3000/updateproduct/${editid}`, editvalue)
    console.log(editdata);
    if (editdata.status === 200) {
      setmodelClose(true);
    }
    showproduct();
  }

  return (
    <div >

      <table className="table text-center table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Category</th>
            <th scope="col">Modal</th>
            <th scope="col">Price</th>
            <th scope="col">Company</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {productdata.map((item, index) => {
          return (
            <tbody key={index}>
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.category}</td>
                <td>{item.model}</td>
                <td>{item.price}</td>
                <td>{item.company}</td>
                <td onClick={() => editproductdata(item.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                  <AiFillEdit /></td>
                <td onClick={async () => {
                  var deleteproduct = await axios.delete(`http://localhost:3000/getproduct/${item.id}`)
                  console.log(deleteproduct)
                  showproduct()
                }}><AiFillDelete /></td>
              </tr>
            </tbody>
          )
        })}
      </table>

      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button> */}

      <form className='m-5' onSubmit={productSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Category</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name='category' value={category} onChange={(e) => setCategory(e.target.value)} />
          {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Model Name</label>
          <input type="text" className="form-control" id="exampleInputPassword1"
            name='model' value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
          <input type="number" className="form-control" id="exampleInputPassword1"
            name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Company</label>
          <input type="taxt " className="form-control" id="exampleInputPassword1"
            name='company' value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>



      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form className='m-5' onSubmit={editproductSubmit} >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Category</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  name='category' value={editcategory} onChange={(e) => seteditCategory(e.target.value)} />
                {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Model Name</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                  name='model' value={editmodel} onChange={(e) => seteditModel(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                <input type="number" className="form-control" id="exampleInputPassword1"
                  name='price' value={editprice} onChange={(e) => seteditPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Company</label>
                <input type="taxt " className="form-control" id="exampleInputPassword1"
                  name='company' value={editcompany} onChange={(e) => seteditCompany(e.target.value)} />
              </div>
              {editproduct.category === editcategory && editproduct.model === editmodel && editproduct.price === editprice
                && editproduct.company === editcompany
                ?
                <button type="submit" className="btn btn-primary" disabled>Add Product</button>
                :
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Add Product</button>

              }
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home