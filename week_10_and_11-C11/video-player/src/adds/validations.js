export function validateName(name, namesList) {
  if (!name) {
    return 'A name must be specified';
  }
  if (namesList.includes(name)) {
    return 'That name is already in use';
  }
  return '';
}
export function validateStartTime(time, endTime, videoDuration) {
  if (time >= videoDuration) {
    return `Start time must be lower than video duration (${videoDuration}s)`;
  }
  if (time >= endTime) {
    return 'Start time must be lower than the end time';
  }
  return '';
}
export function validateEndTime(time, startTime, videoDuration) {
  if (time > videoDuration) {
    return `End time must be lower or equal to the video duration (${videoDuration}s)`;
  }
  if (time <= startTime) {
    return 'End time must be greater than the start time';
  }
  return '';
}

export function validateTag(tag, tagsList) {
  if (!tag) {
    return 'A tag must be specified';
  }
  if (tagsList.includes(tag)) {
    return 'That tag was added already';
  }
  if (tag === 'All') {
    return 'All is not allowed';
  }
  return '';
}
