import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BacktestingForm } from '../types';
import { BacktestingFormSchema } from '../types';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import 'tailwindcss/tailwind.css';

const BacktestingForm: React.FC = () => {
    const form = useForm<BacktestingForm>({
        resolver: zodResolver(BacktestingFormSchema),
        defaultValues: {
            generalSettings: {
                strategyName: '',
                description: '',
                startDate: '',
                endDate: '',
            },
            dataSettings: {
                assetSelection: '',
                dataFrequency: 'Daily',
            },
            superStrategies: [],
            executionSettings: {
                orderType: 'Limit',
                positionSize: '',
                stopLoss: '',
                takeProfit: '',
            },
        },
    });

    const { fields: superStrategyFields, append: appendSuperStrategy, remove: removeSuperStrategy } = useFieldArray({
        control: form.control,
        name: 'superStrategies',
    });

    const onSubmit = (data: BacktestingForm) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 bg-gray-100 rounded-lg text-black">
                <h2 className="text-xl font-bold">General Settings</h2>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="generalSettings.strategyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Strategy Name</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Strategy Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" className="bg-gray-700 text-white" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" className="bg-gray-700 text-white" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <h2 className="text-xl font-bold">Data Settings</h2>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="dataSettings.assetSelection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asset Selection</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Asset Selection" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dataSettings.dataFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data Frequency</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <option value="">Select Frequency</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <h2 className="text-xl font-bold">Super Strategies</h2>
                {superStrategyFields.map((superStrategy, superIndex) => (
                    <SuperStrategySection
                        key={superStrategy.id}
                        control={form.control}
                        register={form.register}
                        superStrategy={superStrategy}
                        superIndex={superIndex}
                        removeSuperStrategy={removeSuperStrategy}
                        errors={form.formState.errors}
                    />
                ))}
                <Button type="button" onClick={() => appendSuperStrategy({ name: '', strategies: [
                    { type: '', parameters: '' },
                ] })}>
                    Add Super Strategy
                </Button>
                {form.formState.errors.superStrategies && <span className="text-red-500">{form.formState.errors.superStrategies.message}</span>}

                <h2 className="text-xl font-bold">Execution Settings</h2>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="executionSettings.orderType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Order Type</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <option value="">Select Order Type</option>
                                        <option value="Market">Market</option>
                                        <option value="Limit">Limit</option>
                                        <option value="Stop">Stop</option>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="executionSettings.positionSize"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position Size</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Position Size" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="executionSettings.stopLoss"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stop Loss</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Stop Loss" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="executionSettings.takeProfit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Take Profit</FormLabel>
                                <FormControl>
                                    <Input className="bg-gray-700 text-white" placeholder="Take Profit" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

const SuperStrategySection: React.FC<{
    control: any;
    register: any;
    superStrategy: any;
    superIndex: number;
    removeSuperStrategy: (index: number) => void;
    errors: any;
}> = ({ control, register, superStrategy, superIndex, removeSuperStrategy, errors }) => {
    const { fields: strategyFields, append: appendStrategy, remove: removeStrategy } = useFieldArray({
        control,
        name: `superStrategies.${superIndex}.strategies` as const,
    });

    return (
        <div className="space-y-4 p-4 border border-gray-300 rounded">
            <div>
                <FormField
                    control={control}
                    name={`superStrategies.${superIndex}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Super Strategy Name</FormLabel>
                            <FormControl>
                                <Input className="bg-gray-700 text-white" placeholder="e.g., Trend Following" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <h3 className="text-lg font-semibold">Strategies</h3>
                {strategyFields.map((strategy, strategyIndex) => (
                    <div key={strategy.id} className="space-y-2">
                        <FormField
                            control={control}
                            name={`superStrategies.${superIndex}.strategies.${strategyIndex}.type`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Strategy Type</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-700 text-white" placeholder="e.g., Moving Average" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`superStrategies.${superIndex}.strategies.${strategyIndex}.parameters`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parameters</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-700 text-white" placeholder="e.g., MA Period" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" onClick={() => removeStrategy(strategyIndex)}>Remove Strategy</Button>
                    </div>
                ))}
                <Button type="button" onClick={() => appendStrategy({ type: '', parameters: '' })}>
                    Add Strategy
                </Button>
            </div>
            <Button type="button" variant="destructive" onClick={() => removeSuperStrategy(superIndex)}>Remove Super Strategy</Button>
        </div>
    );
};

export default BacktestingForm;
