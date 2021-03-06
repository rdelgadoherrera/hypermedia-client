import { Component } from 'react'
import cx from 'classnames'
import factory from './factory'

export default class Input extends Component {
  constructor(props) {
    super()

    this.state = {
      value: props.property.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentValue = this.props.property.value
    const nextValue = nextProps.property.value

    if (nextValue != currentValue) {
      this.setState({
        value: nextValue,
      })
    }
  }

  render() {
    const Element = factory(this.props.property)

    return (
      <div
        className={cx('ct-element', `ct-${this.props.property.type.replace(/\[\]/,'-list')}-element`)}>
        <label className='ct-element-label' htmlFor={this.props.property.name}
          dangerouslySetInnerHTML={{ __html: this.props.property.title }} />
      <Element
        className={cx({
          'ct-input-invalid': this.props.property.errors.length,
        })}
        errors={this.props.property.errors.join('<br>')}
        property={this.props.property}
        onCommit={value => this.update(value)}
        onUpdate={value => this.setState({ value }) }
        onSave={value => this.persist({ value }) }
        onDeleteItem={item => this.deleteItem(item) }
        value={this.state.value} />
      </div>
    )
  }

  deleteItem(item) {
    const { property } = this.props
    this.props.api.deleteItem(property.links, item)
  }

  update(value) {
    if (value === undefined) {
      value = this.state.value
    }
    else {
      this.setState({ value })
    }
    this.persist(value)
  }

  persist(value) {
    const { property, config } = this.props

    if (property.value !== value) {
      this.props.api.update(
      	property.links,
      	property.id,
      	value,
      	property.name,
        config)
    }
  }
}
