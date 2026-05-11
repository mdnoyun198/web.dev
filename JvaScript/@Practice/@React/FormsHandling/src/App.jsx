import { useForm } from "react-hook-form";
import { useState } from "react";
import "./App.css";




export default function App() {

  const {
    register,

    handleSubmit,

    watch,

    setError,

    formState: { errors, isSubmitting },

  } = useForm()


  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }


  const onSubmit = async (data) => {

    // await delay(2)


    let r = await fetch("http://localhost:3000/", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(data)
    })


    let res = r.text()

    console.log("from infromtion", data, res);



    // if (data.username !== "rokey") {
    //   setError("myform", { message: "Your form is not in good order because credentials are invalid" })
    // } 
    // if (data.username === "robin") {
    //   setError("blocked", { message: "Sorry this user is blocked" })
    // } 








  };








  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>



        {/* 
        <label>Name:-</label>

        <input type="text" {...register("Name", {

          required: true,

          minLength: { value: 5, message: "Name must be 5 characters" },

          maxLength: { value: 5, message: "Name not be 5+ characters" }


        })} />

        {errors.Name && <p style={{ color: "red" }}>{errors.Name.message}</p>}

        <p>Remaining: {5 - (watch("Name")?.length || 0)}</p>

 */}











        <br />


        <label>Email:-</label>

        <input type="text" {...register("username", { required: "Username is required" })} />

        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}







        <br />

        <label>Password:-</label>

        <input type="password" {...register("password", { required: "password is required" })} />

        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}


        <br />

        {isSubmitting && <div>Lodimg...</div>}

        <input type="submit" name="Submit" disabled={isSubmitting} />


        <br />

        {errors.myform && <p style={{ color: "red" }}>{errors.myform.message}</p>}
        {errors.blocked && <p style={{ color: "red" }}>{errors.blocked.message}</p>}

      </form>




    </>
  );



}
