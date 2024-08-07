// @ts-strict-ignore
import { DashboardCard } from "@dashboard/components/Card";
import Grid from "@dashboard/components/Grid";
import Hr from "@dashboard/components/Hr";
import { AccountErrorFragment } from "@dashboard/graphql";
import { commonMessages } from "@dashboard/intl";
import { getFormErrors } from "@dashboard/utils/errors";
import getAccountErrorMessage from "@dashboard/utils/errors/account";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import { Text } from "@saleor/macaw-ui-next";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    content: {
      paddingTop: theme.spacing(2),
    },
    hr: {
      margin: theme.spacing(3, 0),
    },
  }),
  { name: "CustomerInfo" },
);

export interface CustomerInfoProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["firstName", "lastName", "email"], errors);

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          <FormattedMessage
            id="4v5gfh"
            defaultMessage="Account Information"
            description="account information, header"
          />
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content className={classes.content}>
        <Text>
          <FormattedMessage {...commonMessages.generalInformations} />
        </Text>
        <Grid variant="uniform">
          <TextField
            data-test-id="customer-first-name"
            disabled={disabled}
            error={!!formErrors.firstName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.firstName, intl)}
            name="firstName"
            type="text"
            label={intl.formatMessage(commonMessages.firstName)}
            value={data.firstName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
          <TextField
            data-test-id="customer-last-name"
            disabled={disabled}
            error={!!formErrors.lastName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.lastName, intl)}
            name="lastName"
            type="text"
            label={intl.formatMessage(commonMessages.lastName)}
            value={data.lastName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
        </Grid>
        <Hr className={classes.hr} />
        <Text>
          <FormattedMessage
            id="SMakqb"
            defaultMessage="Contact Information"
            description="customer contact section, header"
          />
        </Text>
        <TextField
          data-test-id="customer-email"
          disabled={disabled}
          error={!!formErrors.email}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.email, intl)}
          name="email"
          type="email"
          label={intl.formatMessage(commonMessages.email)}
          value={data.email}
          onChange={onChange}
          inputProps={{
            spellCheck: false,
          }}
        />
      </DashboardCard.Content>
    </DashboardCard>
  );
};

CustomerInfo.displayName = "CustomerInfo";
export default CustomerInfo;
