import * as Yup from "yup";
import { Formik } from "formik";
import ImageCropInput from "./components/ImageCropInput";
import InputField from "./components/InputField";
import SelectInput from "./components/SelectInput";
import EnumInput from "./components/EnumInput";
import ColorInput from "./components/ColorInput";
import { useEffect } from "react";
import MultiSelectInput from "./components/MultiSelectInput";

type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "textarea"
  | "image"
  | "radio"
  | "checkbox"
  | "date"
  | "select"
  | "gap"
  | "enum"
  | "color"
  | "view"
  | "multiselect";

export interface FormItem {
  fieldName: string;
  inputType: InputType;
  label: string;
  placeholder?: string;
  options?: { value: any; label: string }[];
  onChange?: (e: any, setValues: (newValues: any) => any, values: any) => void;
  imageAspectRatio?: number;
  className?: string;
  yupSchema?: Yup.Schema<any>;
  loadValue?: (values: any) => any;
  direction?: "vertical" | "horizontal";
  labelClassName?: string;
  containerClassName?: string;
  isVisible?: (values: any) => any;
  onSelectSearchChange?: (text: any, setValues: (newValues: any) => any, values: any) => void;
  selectSearchValue?: string;
  loadSelectValue?: (v: any) => any;
  CustomView?: ({
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    touched,
    index,
  }: {
    values: any;
    errors: any;
    setValues: (newValues: any) => any;
    setErrors: (newErrors: any) => any;
    handleChange: (e: any) => void;
    touched: any;
    index: number;
    handleBlur: (e: any) => void;
  }) => React.ReactNode;
  labelStyles?: any;
}

type FormBuilderProps = {
  value: any;
  className?: string;
  onSubmit: (values: { [key: string]: any }) => void;
  SubmitButton?: ({ isValid, submit }: { isValid: boolean; submit?: () => any }) => React.ReactNode;
  design: FormItem[];
  isEditable?: boolean;
  yupSchema?: Yup.Schema<any>;

  labelStyles?: any;
  customSubmit?: boolean;
};

const FormBuilder = ({
  value,
  design,
  className,
  onSubmit,
  SubmitButton,
  isEditable = true,
  labelStyles,
  customSubmit,
  yupSchema,
}: FormBuilderProps) => {
  const getSchema = (design: FormBuilderProps["design"]) => {
    if (yupSchema) {
      return yupSchema;
    }

    const obj: any = {};
    design.forEach((item) => {
      if (item.yupSchema) {
        obj[item.fieldName] = item.yupSchema;
      }
    });
    return Yup.object().shape(obj);
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={value}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={getSchema(design)}
      >
        {({
          values,
          setValues,
          errors,
          setErrors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
        }) => (
          <form className={`grid py-2 ${className}`} onSubmit={handleSubmit}>
            {design.map((item, index) => {
              const CustomView = item?.CustomView;

              if (item.isVisible && !item.isVisible(values)) {
                return null;
              }

              switch (item.inputType) {
                case "view":
                  return CustomView ? (
                    <CustomView
                      key={index}
                      values={values}
                      errors={errors}
                      setValues={setValues}
                      setErrors={setErrors}
                      handleChange={handleChange}
                      touched={touched}
                      index={index}
                      handleBlur={handleBlur}
                    />
                  ) : null;

                case "gap":
                  return <div key={index} className={item.className} />;

                case "enum":
                  return (
                    <EnumInput
                      labelClassName={item.labelClassName}
                      containerClassName={item.containerClassName}
                      key={index}
                      label={item.label}
                      error={errors[item.fieldName]}
                      className={item.className}
                      value={item.loadValue ? item.loadValue(values) : values[item.fieldName]}
                      onChange={(base64) => {
                        if (item.onChange) {
                          item.onChange(base64, setValues as any, values);
                        } else {
                          setValues({ ...values, [item.fieldName]: base64 });
                        }
                      }}
                      options={item.options!}
                      isEditable={isEditable}
                    />
                  );
                case "color":
                  return (
                    <ColorInput
                      key={index}
                      label={item.label}
                      name={item.fieldName}
                      value={
                        item.loadValue ? item.loadValue(values) : values[item.fieldName] || "#000000" // Default to black if no value
                      }
                      onChange={(value) => {
                        if (item.onChange) {
                          item.onChange(value, setValues as any, values);
                        } else {
                          setValues({
                            ...values,
                            [item.fieldName]: value, // Directly use the value
                          });
                        }
                      }}
                      className={item.className}
                      error={
                        touched[item.fieldName] && typeof errors[item.fieldName] === "string"
                          ? (errors[item.fieldName] as string)
                          : undefined
                      }
                      isEditable={isEditable}
                    />
                  );
                case "image":
                  return (
                    <ImageCropInput
                      labelClassName={item.labelClassName}
                      isEditable={isEditable}
                      label={item.label}
                      key={index}
                      name={item.fieldName}
                      aspectRatio={item.imageAspectRatio || 1}
                      className={item.className}
                      value={item.loadValue ? item.loadValue(values) : values[item.fieldName]}
                      //  @ts-ignore
                      error={errors[item.fieldName]}
                      onChange={(base64) => {
                        if (item.onChange) {
                          item.onChange(base64, setValues as any, values);
                        } else {
                          setValues({ ...values, [item.fieldName]: base64 });
                        }
                      }}
                    />
                  );

                case "multiselect":
                  return (
                    <MultiSelectInput
                      containerClassName={item.containerClassName}
                      labelClassName={item.labelClassName}
                      isEditable={isEditable}
                      onChange={(selectedValue) => {
                        setValues({
                          ...values,
                          [item.fieldName]: selectedValue,
                        });
                      }}
                      loadValue={item.loadSelectValue}
                      label={item.label}
                      options={item.options!}
                      searchValue={item.selectSearchValue}
                      className={item.className}
                      name={item.fieldName}
                      placeholder={item.placeholder}
                      onSearchChange={(text) => {
                        if (item.onSelectSearchChange) {
                          item.onSelectSearchChange(text, setValues as any, values);
                        }
                      }}
                      error={touched.hasOwnProperty(item.fieldName) && errors[item.fieldName]}
                      handleBlur={handleBlur}
                      value={item.loadValue ? item.loadValue(values) : values[item.fieldName]}
                      key={index}
                    />
                  );

                case "select":
                  return (
                    <SelectInput
                      containerClassName={item.containerClassName}
                      labelClassName={item.labelClassName}
                      isEditable={isEditable}
                      onChange={(selectedValue) => {
                        setValues({
                          ...values,
                          [item.fieldName]: selectedValue,
                        });
                      }}
                      loadValue={item.loadSelectValue}
                      label={item.label}
                      options={item.options!}
                      searchValue={item.selectSearchValue}
                      className={item.className}
                      name={item.fieldName}
                      placeholder={item.placeholder}
                      onSearchChange={(text) => {
                        if (item.onSelectSearchChange) {
                          item.onSelectSearchChange(text, setValues as any, values);
                        }
                      }}
                      error={touched.hasOwnProperty(item.fieldName) && errors[item.fieldName]}
                      handleBlur={handleBlur}
                      value={item.loadValue ? item.loadValue(values) : values[item.fieldName]}
                      key={index}
                    />
                  );

                default:
                  return (
                    <InputField
                      containerClassName={item.containerClassName}
                      direction={item.direction}
                      labelStyles={labelStyles}
                      isEditable={isEditable}
                      labelClassName={item.labelClassName}
                      onChange={(e) => {
                        if (item.onChange) {
                          item.onChange(e, setValues as any, values);
                        } else {
                          handleChange(e);
                        }
                      }}
                      label={item.label}
                      value={item.loadValue ? item.loadValue(values) : values[item.fieldName]}
                      className={item.className}
                      //   @ts-ignore
                      error={touched.hasOwnProperty(item.fieldName) && errors[item.fieldName]}
                      key={index}
                      multiline={item.inputType === "textarea"}
                      name={item.fieldName}
                      onBlur={handleBlur}
                      placeholder={item.placeholder}
                      type={item.inputType}
                    />
                  );
              }
            })}

            {isEditable && (
              <>
                {customSubmit ? (
                  <>{SubmitButton && <SubmitButton isValid={isValid} submit={handleSubmit} />}</>
                ) : (
                  <button type="submit" className="col-span-full">
                    {SubmitButton && <SubmitButton isValid={isValid} />}
                  </button>
                )}
              </>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormBuilder;
