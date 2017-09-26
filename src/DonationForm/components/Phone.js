import React from 'react'
import Formsy from 'formsy-react'
import InputMask from '../../utils/inputMask.js'

const Phone = React.createClass({

  setValue(value) {
    console.log(value)
  },

  mixins: [Formsy.Mixin],
  changeValue (event) {
    this.setValue(event.currentTarget['value'])
  },
  render () {
    const className = (this.props.className || ' ')

    const wrappedHandler = (handler) => {
      return (event) => {
        handler(event)
        this.setValue(event.currentTarget['value'])
      }
    }
    const errorMessage = ''
    if (this.props.pattern) {
      this.mask = new InputMask(this.props.pattern.inputMask, this.props.pattern.numberMask)
    } else {
      this.mask = {keyUpHandler: () => {}, keyDownHandler: () => {}}
    }

    let inputElement = (<input
      className={className}
      type={this.props.type || 'text'}
      name={this.props.name}
      onChange={wrappedHandler(this.mask.keyUpHandler)}
      onKeyUp={wrappedHandler(this.mask.keyUpHandler)}
      onKeyDown={wrappedHandler(this.mask.keyDownHandler)}
      value={this.props.value}
      placeholder={this.props.placeholder}
    />)

    let wrapped = (
      <div className='form-group'>
        {inputElement}
        <span className='form-error'>{errorMessage}</span>
        <style jsx>{`
          .form-error {
            display: block;
          }
        `}</style>
      </div>
    )
    return this.props.unwrapped ? inputElement : wrapped
  }
})

export default Phone
