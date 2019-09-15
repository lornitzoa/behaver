import React, { Component } from 'react'




class Overview extends Component {

  render() {
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th className='childNameCol'>CHILD</th>
              <th>BEHAVIOR POINTS</th>
              <th>TASKS COMPLETED</th>
              <th>DAILY SCORE</th>
              <th>STASHED CASH</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.children.length > 0 ?
                this.props.children.map((child, index) => {
                  return (
                    <tr key={index} onClick={() => this.props.changeView(child)}>
                      <td className="childNameCol childName">
                        {child.name}
                      </td>
                      <td>{this.props.scores[index].bx_points_earned}</td>
                      <td>{this.props.scores[index].task_points_earned}</td>
                      <td>{this.props.scores[index].total_points_earned}</td>
                      <td>{this.props.scores[index].stashed_cash}</td>
                    </tr>

                  )
                })
                :
                <tr>
                  <td>
                    <h2>You don't have any children yet</h2>
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Overview
