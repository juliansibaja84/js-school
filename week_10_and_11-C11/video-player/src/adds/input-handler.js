import { validateName, validateStartTime, validateEndTime } from './validations';

const inputHandler = {
  'clip-name': (name, values, errors, duration, clipsList) => (
    {
      values: {
        ...values,
        clipName: name,
      },
      errors: {
        ...errors,
        clipNameError: validateName(name, clipsList.map(clip => clip.clipName)),
      },
    }
  ),
  'start-time': (timeString, values, errors, duration) => {
    const startTimeInSeconds = (+timeString.split(':')[0]) * 60 + (+timeString.split(':')[1]) || 0;
    return {
      values: {
        ...values,
        startTime: startTimeInSeconds || 0,
      },
      errors: {
        ...errors,
        startTimeError: validateStartTime(startTimeInSeconds, values.endTime, duration),
        endTimeError: '',
      },
    };
  },
  'end-time': (timeString, values, errors, duration) => {
    const eTimeInSeconds = (+timeString.split(':')[0]) * 60 + (+timeString.split(':')[1]) || 0;
    return {
      values: {
        ...values,
        endTime: eTimeInSeconds || 0,
      },
      errors: {
        ...errors,
        endTimeError: validateEndTime(eTimeInSeconds, values.startTime, duration),
        startTimeError: '',
      },
    };
  },
  'add-tag': (name, values, errors) => (
    {
      currentTagInputText: name,
      errors: {
        ...errors,
        tagError: '',
      },
    }
  ),
};

export default inputHandler;
