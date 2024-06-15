import { z } from 'zod';

export const GeneralSettingsSchema = z.object({
    strategyName: z.string().min(1, "Strategy Name is required").max(100, "Strategy Name is too long"),
    description: z.string().max(500, "Description is too long").optional(),
    startDate: z.date().refine(val => !isNaN(val.getTime()), {
        message: "Invalid date",
    }),
    endDate: z.date().refine(val => !isNaN(val.getTime()), {
        message: "Invalid date",
    }),
}).refine(data => {
    if (data.startDate >= data.endDate) {
        return {
            startDate: "Start Date must be before End Date",
            endDate: "End Date must be after Start Date",
        };
    }
    return true;
})

export const DataSettingsSchema = z.object({
    assetSelection: z.string().min(1, "Asset Selection is required"),
    dataFrequency: z.enum(["Daily", "Weekly", "Monthly"]),
});

export const StrategySchema = z.object({
    type: z.string().min(1, "Strategy Type is required"),
    parameters: z.string().min(1, "Parameters are required"),
});

export const SuperStrategySchema = z.object({
    name: z.string().min(1, "Super Strategy Name is required"),
    strategies: z.array(StrategySchema).nonempty("At least one strategy is required"),
});

export const ExecutionSettingsSchema = z.object({
    orderType: z.enum(["Market", "Limit", "Stop"]),
    positionSize: z.string().min(1, "Position Size is required"),
    stopLoss: z.string().min(1, "Stop Loss is required"),
    takeProfit: z.string().min(1, "Take Profit is required"),
});

export const BacktestingFormSchema = z.object({
    generalSettings: GeneralSettingsSchema,
    dataSettings: DataSettingsSchema,
    superStrategies: z.array(SuperStrategySchema).nonempty("At least one super strategy is required"),
    executionSettings: ExecutionSettingsSchema,
});

export type GeneralSettings = z.infer<typeof GeneralSettingsSchema>;
export type DataSettings = z.infer<typeof DataSettingsSchema>;
export type Strategy = z.infer<typeof StrategySchema>;
export type SuperStrategy = z.infer<typeof SuperStrategySchema>;
export type ExecutionSettings = z.infer<typeof ExecutionSettingsSchema>;
export type BacktestingForm = z.infer<typeof BacktestingFormSchema>;
