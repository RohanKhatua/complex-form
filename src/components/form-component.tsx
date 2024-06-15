import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { BacktestingForm } from '../types';
import { BacktestingFormSchema } from '../types';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import 'tailwindcss/tailwind.css';
import useStore from '@/store';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from './ui/calendar';

const BacktestingForm: React.FC = () => {
    const { setFormData } = useStore();
    const form = useForm<BacktestingForm>({
        resolver: zodResolver(BacktestingFormSchema),
        // defaultValues: {
        //     generalSettings: {
        //         strategyName: '',
        //         description: '',
        //         startDate: new Date(),
        //         endDate: new Date() ,
        //     },
        //     dataSettings: {
        //         assetSelection: '',
        //         dataFrequency: 'Daily',
        //     },
        //     superStrategies: [],
        //     executionSettings: {
        //         orderType: 'Limit',
        //         positionSize: '',
        //         stopLoss: '',
        //         takeProfit: '',
        //     },
        // },
    });

    const { fields: superStrategyFields, append: appendSuperStrategy, remove: removeSuperStrategy } = useFieldArray({
        control: form.control,
        name: 'superStrategies',
    });

    const onSubmit = (data: BacktestingForm) => {
        setFormData(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
                <h2 className="text-xl font-bold">General Settings</h2>
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="generalSettings.strategyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="" placeholder="Strategy Name" {...field} />
                                </FormControl>
                                <FormDescription>A name for your strategy - so that you can easily remember it</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input className="" placeholder="Description" {...field} />
                                </FormControl>
                                <FormDescription>A brief description of your strategy</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Start Date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The date from which you want to start backtesting your strategy
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="generalSettings.endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>End Date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    The date on which you want to end backtesting your strategy
                                </FormDescription>
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
                                    <Select onValueChange={field.onChange} {...field}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an interval"></SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Daily">Daily</SelectItem>
                                            <SelectItem value="Weekly">Weekly</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                        </SelectContent>
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
                <Button type="button" onClick={() => appendSuperStrategy({
                    name: '', strategies: [
                        { type: '', parameters: '' },
                    ]
                })}>
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
                                    <Select onValueChange={field.onChange} {...field}>

                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an order type"></SelectValue>
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="Market">Market</SelectItem>
                                            <SelectItem value="Limit">Limit</SelectItem>
                                            <SelectItem value="Stop">Stop</SelectItem>
                                        </SelectContent>
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
}> = ({ control, superIndex, removeSuperStrategy }) => {
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
