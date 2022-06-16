import { titleCase
 } from "title-case";
export default function errorFormatter(error) {
    const NOT_AN_INTEGER = "Not a valid integer value.";
    const error_tokens = error.split(" : ");
    if (error_tokens.length === 1) {
        // this isn't an error we need to format
        return <span className="no-field-error">{error}</span>
    }
    let [error_key, error_message] = error_tokens;
    error_key = titleCase(error_key.toLowerCase().split("_").join(" "));
    error_key = error_key.split(" Id")[0];
    error_message = error_message === NOT_AN_INTEGER ? "Please make a selection for this field." : error_message;
    return (
      <>
        <span className="error-field">{error_key}: </span>{" "}
        <span className="error-message">{error_message}</span>
      </>
    );
}
