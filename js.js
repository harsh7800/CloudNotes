import React,{ReactDOM} from "react"

class Message extends React.Component {
  constructor(props){
    super(props);
    this.state(
      {display: "none"}
    )
    this.setState({
      display: "block"
    })
  }

  render() {
        const toggle = ()=>{
          this.setState(!this.state)
        }
        return (<React.Fragment>
          <a href="/" onclick={toggle}>Want to buy a new car?</a>
          <p>Call +11 22 33 44 now!</p>
        </React.Fragment>);
  }
}

document.body.innerHTML = "<div id='root'> </div>";
  
const rootElement = document.getElementById("root");
ReactDOM.render(<Message />, rootElement);

console.log("Before click: " + rootElement.innerHTML);
document.querySelector("a").click();
console.log("After click: " + rootElement.innerHTML);