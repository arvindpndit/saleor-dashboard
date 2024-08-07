// @ts-strict-ignore
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import { getById } from "@dashboard/misc";
import ModalTitle from "@dashboard/orders/components/OrderDiscountCommonModal/ModalTitle";
import { CircularProgress, Modal } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";

import { DashboardCard } from "../Card";
import { useTypeDeleteWarningDialogStyles as useStyles } from "./styles";
import ProductTypeDeleteWarningDialogContent from "./TypeDeleteWarningDialogContent";
import { CommonTypeDeleteWarningMessages, TypeDeleteWarningMessages } from "./types";

export interface TypeBaseData {
  id: string;
  name: string;
}

export interface TypeDeleteMessages {
  baseMessages: CommonTypeDeleteWarningMessages;
  singleWithItemsMessages: TypeDeleteWarningMessages;
  singleWithoutItemsMessages: TypeDeleteWarningMessages;
  multipleWithItemsMessages: TypeDeleteWarningMessages;
  multipleWithoutItemsMessages: TypeDeleteWarningMessages;
}

export interface TypeDeleteWarningDialogProps<T extends TypeBaseData> extends TypeDeleteMessages {
  isOpen: boolean;
  deleteButtonState: ConfirmButtonTransitionState;
  onClose: () => void;
  onDelete: () => void;
  viewAssignedItemsUrl: string;
  typesToDelete: string[];
  assignedItemsCount: number | undefined;
  isLoading?: boolean;
  typesData: T[];
  // temporary, until we add filters to pages list - SALEOR-3279
  showViewAssignedItemsButton?: boolean;
}

function TypeDeleteWarningDialog<T extends TypeBaseData>({
  isLoading = false,
  isOpen,
  baseMessages,
  singleWithItemsMessages,
  singleWithoutItemsMessages,
  multipleWithItemsMessages,
  multipleWithoutItemsMessages,
  onClose,
  onDelete,
  assignedItemsCount,
  viewAssignedItemsUrl,
  typesToDelete,
  typesData,
  showViewAssignedItemsButton = true,
}: TypeDeleteWarningDialogProps<T>) {
  const intl = useIntl();
  const classes = useStyles({});
  const showMultiple = typesToDelete.length > 1;
  const hasAssignedItems = !!assignedItemsCount;
  const selectMessages = () => {
    if (showMultiple) {
      const multipleMessages = hasAssignedItems
        ? multipleWithItemsMessages
        : multipleWithoutItemsMessages;

      return {
        ...multipleMessages,
      };
    }

    const singleMessages = hasAssignedItems ? singleWithItemsMessages : singleWithoutItemsMessages;

    return {
      ...singleMessages,
    };
  };
  const { description, consentLabel } = selectMessages();
  const singleItemSelectedId = typesToDelete[0];
  const singleItemSelectedName = typesData.find(getById(singleItemSelectedId))?.name;

  return (
    <Modal open={isOpen}>
      <div className={classes.centerContainer} data-test-id="warning-dialog">
        <DashboardCard className={classes.content}>
          <ModalTitle
            title={intl.formatMessage(baseMessages.title, {
              selectedTypesCount: typesToDelete.length,
            })}
            withBorder
            onClose={onClose}
          />
          {isLoading ? (
            <DashboardCard.Content className={classes.centerContainer}>
              <CircularProgress size={16} />
            </DashboardCard.Content>
          ) : (
            <ProductTypeDeleteWarningDialogContent
              showViewAssignedItemsButton={showViewAssignedItemsButton}
              assignedItemsCount={assignedItemsCount}
              hasAssignedItems={hasAssignedItems}
              singleItemSelectedName={singleItemSelectedName}
              viewAssignedItemsUrl={viewAssignedItemsUrl}
              onDelete={onDelete}
              description={description}
              consentLabel={consentLabel}
              viewAssignedItemsButtonLabel={baseMessages.viewAssignedItemsButtonLabel}
            />
          )}
        </DashboardCard>
      </div>
    </Modal>
  );
}

export default TypeDeleteWarningDialog;
