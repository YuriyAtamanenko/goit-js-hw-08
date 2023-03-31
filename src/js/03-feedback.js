import throttle from 'lodash.throttle';

const formData = {};

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFormText();

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);

  evt.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function populateFormText() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    refs.email.value = parsedFormData.email;
    refs.message.value = parsedFormData.message;

    parsedFormData.email
      ? (formData['email'] = parsedFormData.email)
      : (formData['email'] = '');
    parsedFormData.message
      ? (formData['message'] = parsedFormData.message)
      : (formData['message'] = '');
  }
}
