import { GiftCardErrorFragment, TimePeriodTypeEnum } from "@dashboard/graphql";
import { FormChange } from "@dashboard/hooks/useForm";
import { Option } from "@saleor/macaw-ui-next";

import { GiftCardExpiryType } from "../GiftCardCreateDialog/types";

export type GiftCardErrorKey =
  | "tags"
  | "expiryDate"
  | "currency"
  | "expiryPeriod"
  | "amount"
  | "balance"
  | "count";

export const giftCardBulkCreateErrorKeys: GiftCardErrorKey[] = [
  "tags",
  "expiryDate",
  "currency",
  "amount",
  "balance",
  "count",
];

export interface GiftCardBulkCreateFormData extends GiftCardCreateCommonFormData {
  cardsAmount: number;
}

export type GiftCardBulkCreateFormError = Pick<GiftCardErrorFragment, "code" | "field">;

export type GiftCardBulkCreateFormErrors = Partial<
  Record<GiftCardErrorKey, GiftCardBulkCreateFormError>
>;

export interface GiftCardBulkCreateFormCommonProps {
  change: FormChange;
  toggleValue: FormChange;
  errors: GiftCardBulkCreateFormErrors;
  data: GiftCardBulkCreateFormData;
}

export interface GiftCardCreateCommonFormData {
  expirySelected: boolean;
  expiryType: GiftCardExpiryType;
  expiryPeriodType: TimePeriodTypeEnum;
  expiryPeriodAmount: number;
  requiresActivation: boolean;
  tags: Option[];
  balanceAmount: number;
  balanceCurrency: string;
  expiryDate: string;
}
