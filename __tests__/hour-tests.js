// __tests__/hour-tests.js
jest.unmock('../src/components/elements/inputs/date/hour')
jest.unmock('../src/components/elements/inputs/date/date-util')

import { createRenderer } from 'react-test-renderer/shallow'
import Hour from '../src/components/elements/inputs/date/hour'

describe('Hour', () => {
  let hour
  const commitSpy = jasmine.createSpy('OnCommit')

  function renderComponent(date) {
    const renderer = createRenderer()
    renderer.render(
      <Hour value={date} onCommit={commitSpy} />
    )
    hour = renderer.getRenderOutput()
  }

  function getFirstOption() {
    return hour.props.children[1].props.value
  }

  function getLastOption() {
    return hour.props.children[hour.props.children.length - 1].props.value
  }

  describe('with date time 2012-02-01 15:30 in 12 hour format', () => {
    beforeEach(() => {
      renderComponent(new Date(2012, 1, 1, 15, 30))
    })

    it('sets the value to 4 (PM)', () => {
      expect(hour.props.value).toEqual(new Date(2012, 1, 1, 15, 30).getHours()-12)
    })

    it('has 0 as the first option', () => {
      expect(getFirstOption()).toEqual(0)
    })

    it('has 12 as the last option', () => {
      expect(getLastOption()).toEqual(12)
    })

    describe('And changing hour to 6 (PM)', () => {
      it('sets the hour to 18', () => {
        hour.props.onChange({ target: { value: 6 }})
        const newDate = commitSpy.calls.mostRecent().args[0]

        expect(newDate.getHours()).toEqual(18)
      })
    })
  })
})
