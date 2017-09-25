import React from "react"
import ReactDOM from "react-dom"
import BarGraph from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      title: this.props.title,
      weight: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.title}>
        <td style={style.cell}>{this.props.title} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.weight)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class ScaleSwitch extends React.Component {
  constructor() {
    super()
    this.state = {
      selected: "lin"
    }
  }

  changeHandler(e) {
    this.setState({
      selected: e.target.value
    })
    this.props.updateScale(e.target.value)
  }

  render() {
    const style = {
      cell: {
        width: "100px",
      }
    }

    return (
      <tr>
        <td style={style.cell} >
          <label>
            <input type="radio" value="lin"
              checked={this.state.selected === "lin"}
              onChange={this.changeHandler.bind(this)}/>
            Linear
          </label>
        </td>
        <td style={style.cell} >
          <label>
            <input type="radio" value="log"
              checked={this.state.selected==="log"}
              onChange={this.changeHandler.bind(this)} />
            Log
          </label>
        </td>
      </tr>
    )
  }
}

class KeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px",
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      rows.push(
        <KeyValueRow key={dataPoint.title}
          title={dataPoint.title} weight={dataPoint.weight}
          updateData={this.props.updateData.bind(this)} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
        <table>
          <tbody>
            <ScaleSwitch updateScale={this.props.updateScale.bind(this)} />
          </tbody>
        </table>
      </div>
    )
  }

}

class GroupKeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      title: this.props.title,
      group: this.props.group,
      weight: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.title+this.props.group}>
        <td style={style.cell}>{this.props.title} </td>
        <td style={style.cell}>{this.props.group} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.weight)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}


class GroupKeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px",
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      rows.push(
        <GroupKeyValueRow key={dataPoint.title+dataPoint.group}
          title={dataPoint.title} weight={dataPoint.weight}
          group={dataPoint.group}
          updateData={this.props.updateData.bind(this)} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}


class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {weight: 1300, title: "China", color: "#4cab92"},
        {weight: 1266, title: "India", color: "#ca0004"},
        {weight: 323, title: "United States", color: "#003953"},
        {weight: 205, title: "Brazil", color: "#9dbd5f"},
        {weight: 186, title: "Nigeria", color: "#005c7a"},
        {weight: 156, title: "Bangladesh", color: "#fc6000"},
      ],
      groupedData: [
        // {weight: 1020, group: "China", title: 2018},
        // {weight: 1420, group: "China", title: 2016},
        {weight: 1367, group: "China", title: 2014},
        {weight: 1354, group: "China", title: 2012},
        {weight: 1340, group: "China", title: 2010},
        // {weight: 200, group: "United States", title: 2018},
        // {weight: 420, group: "United States", title: 2016},
        {weight: 317, group: "United States", title: 2014},
        {weight: 312, group: "United States", title: 2012},
        {weight: 308, group: "United States", title: 2010},
      ],
      scale: "lin"
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].title === mutatedObject.title) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseInt(mutatedObject.weight)
      this.setState({data: mutatedData})
    }
  }

  updateGroupData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.groupedData))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].title === mutatedObject.title &&
        mutatedData[index].group === mutatedObject.group) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseInt(mutatedObject.weight)
      this.setState({groupedData: mutatedData})
    }
  }

  updateScale(scale) {
    this.setState({scale: scale})
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Bar Graph </h1>
        <div style={{width:"70%", display:"inline-block"}}>
          <BarGraph data={this.state.data} xKey="title" yKey="weight"
            yScale={this.state.scale} />
          <BarGraph data={this.state.groupedData} xKey="title" yKey="weight"
            groupKey="group" yScale={this.state.scale} />
        </div>
        <KeyValueTable data={this.state.data}
          updateData={this.updateData.bind(this)}
          updateScale={this.updateScale.bind(this)} />
        <GroupKeyValueTable data={this.state.groupedData}
          updateData={this.updateGroupData.bind(this)}/>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)