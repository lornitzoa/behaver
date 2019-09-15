import React, { Component } from 'react'

class Cashins extends Component {

  

  render() {
    return (
      <div>
        <ul>
          {
            this.props.cashins.length > 0 ?
              this.props.cashins.map((cashin, index) => {
                return (
                  <li key={index}>
                    <div className='opt-item'>
                      <div className='opts-info'>
                        <h3 className='opts-h3'>
                          {cashin.reinforcement}: {cashin.points} points
                        </h3>
                        <p className='opts-p'>
                          Available: {cashin.no_available}/{cashin.daily_allotment}
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
            <div>No Cashins Available</div>
          }
        </ul>
      </div>
    )
  }
}

export default Cashins
