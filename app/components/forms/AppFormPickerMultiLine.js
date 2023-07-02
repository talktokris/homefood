import React from "react";
import { useFormikContext } from "formik";

import AppPickerMultiLine from "../AppPickerMultiLine";
import ErrorMessage from "./ErrorMessage";

function AppFormPickerMultiLine({
  items,
  name,
  lebel,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
  ...otherProps
}) {
  const { errors, setFieldValue, selectedItem, touched, values } =
    useFormikContext();
  return (
    <>
      <AppPickerMultiLine
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        lebel={lebel}
        //selectedItem={selectedItem}
        selectedItem={values[name]}
        bnBlue={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPickerMultiLine;
