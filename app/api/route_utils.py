from flask_login import current_user

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages;

def check_ownership(dbObject):
    """
    Checks if the current user matches the user_id field of a database object.
    If there is no user_id in the object, this validation fails.
    """
    user_id = getattr(dbObject, "user_id", None);
    # shouldn't try to validate ownership of unowned objects
    # if they are not owned we will assume that checking ownership
    # should fail.
    if not user_id:
        return False;
    logged_in_user_id = current_user.id
    if user_id == logged_in_user_id:
        return True;
    else:
        return False;
