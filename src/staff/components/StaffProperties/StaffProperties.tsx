// @ts-strict-ignore
import photoIcon from "@assets/images/photo-icon.svg";
import { DashboardCard } from "@dashboard/components/Card";
import { StaffErrorFragment, StaffMemberDetailsFragment, UserFragment } from "@dashboard/graphql";
import { commonMessages } from "@dashboard/intl";
import { getUserInitials } from "@dashboard/misc";
import { getFormErrors } from "@dashboard/utils/errors";
import getStaffErrorMessage from "@dashboard/utils/errors/staff";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import { Text, vars } from "@saleor/macaw-ui-next";
import React from "react";
import SVG from "react-inlinesvg";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    avatar: {
      "& svg": {
        fill: "#fff",
      },
      "&:hover $avatarHover": {
        opacity: 1,
      },
      alignItems: "center",
      borderRadius: "100%",
      display: "grid",
      height: 120,
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      width: 120,
    },
    avatarActionText: {
      "&:hover": {
        textDecoration: "underline",
      },
      color: "#fff",
      cursor: "pointer",
      fontSize: 12,
    },
    avatarDefault: {
      "& div": {
        color: vars.colors.text.buttonDefaultPrimary,
        fontSize: 35,
        fontWeight: 580,
        lineHeight: "120px",
      },
      background: vars.colors.background.accent1,
      height: 120,
      textAlign: "center",
      width: 120,
    },
    avatarHover: {
      background: "#00000080",
      borderRadius: "100%",
      fontSize: 12,
      fontWeight: 500,
      height: 120,
      opacity: 0,
      padding: theme.spacing(2.5, 0),
      position: "absolute",
      textAlign: "center",
      textTransform: "uppercase",
      transition: "opacity 0.5s",
      width: 120,
    },
    avatarImage: {
      pointerEvents: "none",
      width: "100%",
    },
    fileField: {
      display: "none",
    },
    prop: {
      marginBottom: theme.spacing(2),
    },
    propGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
      },
    },
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(4),
      gridTemplateColumns: "120px 1fr",
    },
  }),
  { name: "StaffProperties" },
);

interface StaffPropertiesProps {
  canEditAvatar: boolean;
  className?: string;
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
  errors: StaffErrorFragment[];
  disabled: boolean;
  staffMember: StaffMemberDetailsFragment | UserFragment;
  onChange: (event: React.ChangeEvent<any>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

const StaffProperties: React.FC<StaffPropertiesProps> = props => {
  const {
    canEditAvatar,
    className,
    data,
    errors,
    staffMember,
    onChange,
    onImageDelete,
    onImageUpload,
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const imgInputAnchor = React.createRef<HTMLInputElement>();
  const clickImgInput = () => imgInputAnchor.current.click();
  const formErrors = getFormErrors(["id", "firstName", "lastName", "email"], errors || []);
  const hasAvatar = !!staffMember?.avatar?.url;
  const getFieldProps = (name: string) => ({
    disabled: props.disabled,
    error: !!formErrors[name],
    helperText: formErrors[name]?.message,
    label: intl.formatMessage(commonMessages[name]),
    name,
    value: data[name],
  });

  return (
    <DashboardCard className={className} data-test-id="staff-member-information">
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage({
            id: "VTITVe",
            defaultMessage: "Staff Member Information",
            description: "section header",
          })}
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content>
        <div className={classes.root}>
          <div>
            <div className={classes.avatar}>
              {hasAvatar ? (
                <img className={classes.avatarImage} src={staffMember.avatar.url} />
              ) : (
                <div className={classes.avatarDefault}>
                  <Text>{getUserInitials(data)}</Text>
                </div>
              )}
              {canEditAvatar && (
                <div className={classes.avatarHover}>
                  <SVG src={photoIcon} />
                  <Text onClick={clickImgInput} className={classes.avatarActionText}>
                    <FormattedMessage
                      id="+2VzH4"
                      defaultMessage="Change"
                      description="avatar change button"
                    />
                  </Text>
                  {hasAvatar && (
                    <>
                      <Text onClick={onImageDelete} className={classes.avatarActionText}>
                        <FormattedMessage
                          id="11lR5V"
                          defaultMessage="Delete"
                          description="avatar delete button"
                        />
                      </Text>
                    </>
                  )}
                  <input
                    className={classes.fileField}
                    id="fileUpload"
                    onChange={event => onImageUpload(event.target.files[0])}
                    type="file"
                    ref={imgInputAnchor}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={classes.propGrid}>
              <div className={classes.prop}>
                <TextField
                  {...getFieldProps("firstName")}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    "data-test-id": "staffFirstName",
                  }}
                />
              </div>
              <div className={classes.prop}>
                <TextField
                  {...getFieldProps("lastName")}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    "data-test-id": "staffLastName",
                  }}
                />
              </div>
              <div className={classes.prop}>
                <TextField
                  {...getFieldProps("email")}
                  onChange={onChange}
                  fullWidth
                  inputProps={{
                    spellCheck: false,
                    "data-test-id": "staffEmail",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardCard.Content>
      {!!formErrors.id && (
        <DashboardCard.Content>
          <Text color="critical1">{getStaffErrorMessage(formErrors.id, intl)}</Text>
        </DashboardCard.Content>
      )}
    </DashboardCard>
  );
};

StaffProperties.displayName = "StaffProperties";
export default StaffProperties;
