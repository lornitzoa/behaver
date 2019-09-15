import React, { Component } from 'react'


class Tasks_Bx extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.tasks);
    console.log(this.props.behaviors);
  }

  render() {
    return (
      <div className='opt-container'>
        <div className='opts-col'>
          <h2>Tasks</h2>
          <ul>
            {
              this.props.tasks.length > 0 ?
                this.props.tasks.map((task, index) => {
                  return (
                    <li key={index}>
                      <div className='opt-item'>
                        <div className='opts-info'>
                          <h3 className='opts-h3'>
                            {task.task_name}: {task.points} points
                          </h3>
                          <p className='opts-p'>
                            {task.frequency} {task.time_of_day}
                          </p>
                        </div>
                        <div className='opt-btns'>
                          <i className="far fa-check-circle fa-2x"></i>
                          <i className="far fa-edit fa-2x"></i>
                          <i className="far fa-trash-alt fa-2x"></i>
                        </div>
                      </div>
                    </li>
                  )
                })
              :
              <div>No Tasks Assigned</div>
            }
          </ul>
        </div>
        <div className='opts-col'>
          <h2>Behaviors</h2>
          <ul>
            {
              this.props.behaviors.length > 0 ?
                this.props.behaviors.map((bx, index) => {
                  return(
                    <li key={index}>
                    <div className='opt-item'>
                      <div className='opts-info'>
                        <h3 className='opts-h3'>
                          {bx.behavior}: {bx.points} points
                        </h3>
                        <p className='opts-p'>
                          {bx.targeted_for}
                        </p>
                      </div>
                      <div className='opt-btns'>
                        <i class="fas fa-plus-circle fa-2x"></i>
                        <i className="far fa-edit fa-2x"></i>
                        <i className="far fa-trash-alt fa-2x"></i>
                      </div>
                    </div>
                    </li>
                  )
                })
              :
              <div>No Behaviors Assigned</div>
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Tasks_Bx
