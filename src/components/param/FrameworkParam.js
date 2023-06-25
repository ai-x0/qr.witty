import React from "react";
import PropTypes from "prop-types";
import "../Qrcode.css";
import './framework.scss'

// const FrameworkParam = ({ paramName, children, ...other }) => (
//     <table className="Qr-table" {...other}>
//         <tbody>
//         <tr>
//             <td>{ paramName }</td>
//             <td>
//                 { children }
//             </td>
//         </tr>
//         </tbody>
//     </table>
// )

const FrameworkParam = ({ paramName, children, ...other }) => (
  <div className="dbtformitem">
    <div className="dbtformitem-label">{paramName}</div>
    <div className="dbtformitem-control">{children}</div>
  </div>
);

export default FrameworkParam;
