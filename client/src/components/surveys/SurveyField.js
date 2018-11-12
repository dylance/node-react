// Survey Field contains logic to render single label and text input
import React from "react";

export default ({input, label, meta: { error, touched } }) => {
  // the props automatically brings in a bunch of event handlers, etc. from redux form
  //console.log("These are the props: ", input);
  //console.log(meta)
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  )
}
