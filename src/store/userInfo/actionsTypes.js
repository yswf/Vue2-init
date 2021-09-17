const namespace = "USER_INFO";

export const ACTION_TYPE = {
  LOAD_REQUEST: `LOAD_${namespace}_REQUEST`,
  LOAD_FAILURE: `LOAD_${namespace}_FAILURE`,
  LOAD_SUCCESS: `LOAD_${namespace}_SUCCESS`,

  CREATE_ONE: `CREATE_${namespace}_ONE`,
  UPDATE_ONE: `UPDATE_${namespace}_ONE`,
};
