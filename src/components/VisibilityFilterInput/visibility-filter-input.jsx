import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { setFilter } from '../../actions/actions';

const VisibilityFilter = (props) => {
  
  return (
  <Form.Control
    onChange={event => props.setFilter(event.target.value)}
    value={props.VisibilityFilter}
    placeholder="search"
  />
  )
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilter);
