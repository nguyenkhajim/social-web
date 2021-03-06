import React, { Fragment, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addExOrEdu } from '../../actions/profile';

const AddEducation = ({
  addExOrEdu,
  history,
  profile: { loading, profile }
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    description: '',
    current: false
  });
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const toggleStatusCheckBox = (current) => {
    setFormData({
      ...formData,
      current: current
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    addExOrEdu(formData, history, 'Education');
  };
  if (!loading && profile === null) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Field Of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              onChange={() => toggleStatusCheckBox(!current)}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            disabled={current}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.protoTypes = {
  profile: PropTypes.object.isRequired,
  addExOrEdu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});
export default connect(mapStateToProps, { addExOrEdu })(
  withRouter(AddEducation)
);
