import React from 'react'
import Input from './input'

export default class BooleanList extends Input {
  isChecked(value) {
    if (!this.props.property.isArray) {
      return this.state.value === value
    }

    for (const selection of this.state.value) {
      if (value === selection) {
        return true
      }
    }
  }

  onChange(e, value) {
    if (!this.props.property.isArray) {
      return this.update(value)
    }

    const values = [...this.state.value]

    if (e.target.checked) {
      values.push(value)
    }
    else {
      values.splice(values.indexOf(value), 1)
    }

    this.update(values)
  }

  render() {
    return (
      <div className={`ct-input ct-${this.props.property.display}-list`}>
        {this.props.property.options.map(option => {
          return (
            <div key={option.value}>
              <input
                checked={this.isChecked(option.value)}
                onChange={e => this.onChange(e, option.value)}
                name={this.props.property.id}
                type={this.props.property.isArray ? 'checkbox' : 'radio'}
                value={option.value} />
              {option.title}
            </div>
          )
        })}
      </div>
    )
  }
}
