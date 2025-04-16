
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Select } from '../select';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export type TArticleProps = {
	defaultState: ArticleStateType,
	changeStyleState: (state: ArticleStateType) => void;
}

export type TConfigurationState = ArticleStateType & {
	opened: boolean
}

export const ArticleParamsForm = ({changeStyleState, defaultState}: TArticleProps) => {
	const [state, setState] = useState({...defaultState, opened: false});
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		changeStyleState(state);
	}
	const reset = () => {
		let prev = {...defaultState, opened: true};
		setState(prev);
		changeStyleState(prev)
		console.log("resety")
	}
	const optChange = (opt: OptionType, prop: keyof ArticleStateType) => {
		let changedState = {... state};
		changedState[prop] = opt;
		setState(changedState);
	}
	const toggleOpen = () => {
		setState(prev => ({ ...prev, opened: !prev.opened }));
	}
	const formRef = useRef<HTMLDivElement>(null);
	const handleClick = (e: MouseEvent) => {
		if(state.opened && formRef.current && !formRef.current.contains(e.target as Node)){
			toggleOpen();
		}
	}
	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		}
	}, [state.opened])

	return (
		<>
			<ArrowButton opened={state.opened} onClick={toggleOpen}/>
			<aside
			ref={formRef}
				//className={`${styles.container} ${state.opened ? styles.container_open : ""}`}
				className={clsx(styles.container, {[styles.container_open]: state.opened})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Select selected={state.fontFamilyOption} title='Шрифт' options={fontFamilyOptions} onChange={opt => optChange(opt, "fontFamilyOption")} />
					<RadioGroup name='kek' title='Размер шрифта' selected={state.fontSizeOption} options={fontSizeOptions} onChange={opt => optChange(opt, "fontSizeOption")} />
					<Select selected={state.fontColor} title='Цвет шрифта' options={fontColors} onChange={opt => optChange(opt, "fontColor")} />
					<Separator/>
					<Select selected={state.backgroundColor} title='Цвет фона' options={backgroundColors} onChange={opt => optChange(opt, "backgroundColor")} />
					<Select selected={state.contentWidth} title='Ширина контента' options={contentWidthArr} onChange={opt => optChange(opt, "contentWidth")} />
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={reset}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

