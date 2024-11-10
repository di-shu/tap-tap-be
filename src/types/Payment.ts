export interface ITransactionPayload {
  user_id: string;
  amount: number;
  transaction_hash?: string;
  status?: string;
}

export interface ITransactionResponse {
  hash: string;
  description: {
    compute_ph: {
      success: boolean;
    };
  };
  out_msgs: { value: string }[];
}
