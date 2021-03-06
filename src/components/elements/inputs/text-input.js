import cx from 'classnames'

export default ({ className, errors, onCommit, onUpdate, value, property, readOnly }) => (
	<input
		className={cx(className, 'ct-input', 'ct-text-input')}
		data-tip={errors}
		readOnly={property.disabled}
		id={property.name}
		onBlur={() => onCommit()}
		onChange={e => onUpdate(e.target.value)}
		title={property.title}
		type={{ email: 'email', telephone: 'tel', password: 'password' }[property.display] || 'text'}
		value={value || ''} />
)
